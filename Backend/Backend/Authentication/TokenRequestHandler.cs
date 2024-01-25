using Db.Repositories;
using Db.Utils;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Server;
using System.Security.Claims;
using static OpenIddict.Abstractions.OpenIddictConstants;
using static OpenIddict.Server.OpenIddictServerEvents;

namespace Api.Authentication
{
    public class TokenRequestHandler : IOpenIddictServerHandler<HandleTokenRequestContext>
    {
        private readonly UserRepository _userRepository;

        public TokenRequestHandler(UserRepository usuariosRepository)
        {
            _userRepository = usuariosRepository;
        }

        public async ValueTask HandleAsync(HandleTokenRequestContext context)
        {
            ClaimsIdentity? identity;
            if (context.Request.IsPasswordGrantType())
            {
                identity = await HandlePasswordCredentialsAsync(context);
            }
            else if (context.Request.IsRefreshTokenGrantType())
            {
                identity = await HandleRefreshTokenAsync(context);
            }
            else
            {
                throw new InvalidOperationException("The specified grant type is not supported.");
            }

            if (identity != null)
            {
                var principal = new ClaimsPrincipal(identity);
                principal.SetScopes(Scopes.OpenId, Scopes.OfflineAccess);
                context.SignIn(principal);
            }
        }

        private async ValueTask<ClaimsIdentity?> HandlePasswordCredentialsAsync(HandleTokenRequestContext context)
        {
            var identity = new ClaimsIdentity(TokenValidationParameters.DefaultAuthenticationType);

            if (string.IsNullOrEmpty(context.Request.Username) || string.IsNullOrEmpty(context.Request.Password))
            {
                context.Reject(Errors.InvalidGrant, "O usuário ou a senha estão incorretos.");
                return null;
            }

            var user = await _userRepository.GetUserAsyncByEmail(context.Request.Username.ToLower());
            if (user == null)
            {
                context.Reject(Errors.InvalidGrant, "O usuário ou a senha estão incorretos.");
                return null;
            }

            var passwordHash = PasswordHasher.Hash(context.Request.Password);
            if (user.Password != passwordHash)
            {
                context.Reject(Errors.InvalidGrant, "O usuário ou a senha estão incorretos.");
                return null;
            }

            identity.AddClaim(new Claim(Claims.Subject, user.Id.ToString()).SetDestinations(Destinations.AccessToken, Destinations.IdentityToken));
            identity.AddClaim(new Claim(Claims.Name, user.Name).SetDestinations(Destinations.AccessToken, Destinations.IdentityToken));
            identity.AddClaim(new Claim(Claims.Email, user.Email).SetDestinations(Destinations.AccessToken, Destinations.IdentityToken));

            return identity;
        }

        private ValueTask<ClaimsIdentity?> HandleRefreshTokenAsync(HandleTokenRequestContext context)
        {
            return new ValueTask<ClaimsIdentity?>(context.Principal?.Identities.FirstOrDefault());
        }
    }
}

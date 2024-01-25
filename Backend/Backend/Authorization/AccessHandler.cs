﻿using Db.Models;
using Db.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Authorization
{
    public class AccessHandler : AuthorizationHandler<AccessRequirement>
    {
        private readonly UserRepository _usuariosRepository;

        public AccessHandler(IHttpContextAccessor httpCA, UserRepository usuariosRepository)
        {
            _usuariosRepository = usuariosRepository;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AccessRequirement requirement)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                var id = int.Parse(context.User.Claims.Single(c => c.Type == "sub").Value);

                var user = await _usuariosRepository.GetUserAsyncById(id);

                if (user != null &&  user.Access >= requirement.userAccess)
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}

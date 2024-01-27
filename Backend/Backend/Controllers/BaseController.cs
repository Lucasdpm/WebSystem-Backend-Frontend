using Microsoft.AspNetCore.Mvc;


namespace Diniz.Api.Controllers
{
    public abstract class BaseController : Controller
    {
        protected int CurrentId => int.Parse(User.Claims.Single(c => c.Type == "sub").Value);

        protected string CurrentEmail => User.Claims.Single(c => c.Type == "email").Value;

        protected string CurrentCnpj => User.Claims.Single(c => c.Type == "cnpj").Value;

        protected int CurrentUserId
        {
            get
            {
                const string headerName = "x-userid";

                if (Request.Headers.TryGetValue(headerName, out var xUserId))
                {
                    if (int.TryParse(xUserId.First(), out var userId))
                    {
                        return userId;
                    }
                }

                throw new Exception(headerName);
            }
        }
    }
}

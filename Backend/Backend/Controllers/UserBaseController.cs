using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Api.Controllers
{
    public abstract class UserBaseController : Controller
    {
        protected int CurrentId => int.Parse(User.Claims.Single(c => c.Type == "sub").Value);

        protected string CurrentEmail => User.Claims.Single(c => c.Type == "email").Value;

        protected string CurrentCnpj => User.Claims.Single(c => c.Type == "cpf").Value;

        protected string CurrentAccess => User.Claims.Single(c => c.Type == "access").Value;

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

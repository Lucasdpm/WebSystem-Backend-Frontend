using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Api.Controllers
{
    public abstract class UserBaseController : Controller
    {
        protected int CurrentId => int.Parse(User.Claims.Single(c => c.Type == "sub").Value);

        protected string CurrentEmail => User.Claims.Single(c => c.Type == "email").Value;

        protected string CurrentCnpj => User.Claims.Single(c => c.Type == "cnpj").Value;

        protected int CurrentFornecedorId
        {
            get
            {
                const string headerName = "x-fornecedorid";

                if (Request.Headers.TryGetValue(headerName, out var xFornecedorId))
                {
                    if (int.TryParse(xFornecedorId.First(), out var fornecedorId))
                    {
                        return fornecedorId;
                    }
                }

                throw new Exception(headerName);
            }
        }

        protected int CurrentLojaId
        {
            get
            {
                const string headerName = "x-lojaid";

                if (Request.Headers.TryGetValue(headerName, out var xLojaId))
                {
                    if (int.TryParse(xLojaId.First(), out var lojaId))
                    {
                        return lojaId;
                    }
                }

                throw new Exception(headerName);
            }
        }
    }
}

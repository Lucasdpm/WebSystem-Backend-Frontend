using Db.Models;
using Microsoft.AspNetCore.Authorization;

namespace Api.Authorization
{
    public class AccessRequirement : IAuthorizationRequirement
    {
        public Access userAccess { get; set; }

        public AccessRequirement(Access accessLevel)
        {
            userAccess = accessLevel;
        }
    }
}

using System;
using System.Security.Cryptography;
using System.Text;

namespace Db.Utils
{
    public class PasswordHasher
    {
        public static string Hash(string password)
        {
            var buffer = Encoding.ASCII.GetBytes(password);
            var sha1Provider = SHA1.Create();
            var hash = sha1Provider.ComputeHash(buffer);

            var sb = new StringBuilder();
            for (var i = 0; i < hash.Length; i += 4)
            {
                sb.Append(BitConverter.ToUInt32(hash, i).ToString("X8"));
            }
            return sb.ToString();
        }
    }
}

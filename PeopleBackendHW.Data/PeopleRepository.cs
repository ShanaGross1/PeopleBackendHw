using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleBackendHW.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void DeletePerson(List<int> ids)
        {
            //using var context = new PeopleDataContext(_connectionString);
            //var sql = ids.Select(id => $"OR Id = {id} ").ToString();
            // context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = 0 {sql} ");
            //            context.SaveChanges();
            foreach (int id in ids)
            {
                DeletePerson(id);
            }

        }

        public void DeletePerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            context.SaveChanges();
        }

        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}

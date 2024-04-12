using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleBackendHW.Data;
using PeopleBackendHW.Web.Models;

namespace PeopleBackendHW.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [Route("deletemany")]
        [HttpPost]
        public void DeletePeople(DeletePersonViewModel vm)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(vm.Ids);
        }

        [Route("delete")]
        [HttpPost]
        public void DeletePerson(DeletePersonViewModel vm)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(vm.Id);
        }

        [Route("update")]
        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.UpdatePerson(person);
        }
    }
}

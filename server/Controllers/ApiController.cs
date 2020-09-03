namespace Api.Controllers
{
  
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using Api.Models;
    using Api.Contracts;
    using System;

    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly IDataService _dataService ;

        public ApiController(IDataService dataService)
        {
            this._dataService = dataService;
        }
        // GET: Api
        [HttpGet]
        [Route("")]
        [Route("Home")]
        public ActionResult Index()
        {
            return Ok("Healthcheck");
        }

        [HttpGet]
        [Route("All")]
        public ActionResult<List<EntityModel>> GetAll()
        {
            return Ok(this._dataService.AllEntities());
        }

        [HttpPatch]
        [Route("PatchOne")]
        public ActionResult<List<EntityModel>> PatchOne(EntityModel model)
        {
            return Ok(this._dataService.UpdateEntity(model));
        }

        [HttpPatch]
        [Route("MassPatch")]
        public ActionResult<List<EntityModel>> MassPatch(List<EntityModel> records)
        {
            return Ok(this._dataService.MassUpdate(records));
        }

        [HttpDelete("{id}")]
        [Route("delete")]
        public ActionResult<List<EntityModel>> DeleteOne(int id)
        {
            return Ok(this._dataService.DeleteEntity(id));
        }

        [HttpPost]
        [Route("MassDelete")]
        public ActionResult<List<EntityModel>> MassDelete(List<int> ids)
        {
            return Ok(this._dataService.MassDelete(ids));
        }

        [HttpPost]
        [Route("Create")]
        public ActionResult<List<EntityModel>> Create(EntityModel record)
        {
           
            
            return Ok(this._dataService.Create(record));
        }
    }
}
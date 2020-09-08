namespace Api.ActionFilters
{
    using Api.Contracts;
    using Api.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using System;
    using System.Linq;


    public class ValidationFilterEditAttribute : IActionFilter
    {
        private readonly IDataService _dataService;
        public ValidationFilterEditAttribute(IDataService dataService)
        {
            this._dataService = dataService;
        }
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var param = context.ActionArguments.SingleOrDefault(predicate => predicate.Value is EntityModel);
            EntityModel record = param.Value as EntityModel;

            int id = int.Parse(record.id.ToString());
            bool doesIdExists = this._dataService.AllEntities().Any(d => d.id == id);
            if (!doesIdExists)
            {
                context.Result = new BadRequestObjectResult($"The id {id} that you are trying to edit does not exist in the database");

            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }
}

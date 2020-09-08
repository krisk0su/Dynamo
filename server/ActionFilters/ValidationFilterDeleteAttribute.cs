namespace Api.ActionFilters
{
    using Api.Contracts;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using System.Linq;



    public class ValidationFilterDeleteAttribute : IActionFilter
    {
        private readonly IDataService _dataService;
        public ValidationFilterDeleteAttribute(IDataService dataService)
        {
            this._dataService = dataService;
        }
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var param = context.ActionArguments.SingleOrDefault(predicate => predicate.Value is int);
            var id = int.Parse(param.Value.ToString());
            bool doesIdExists = this._dataService.AllEntities().Any(d => d.id == id);
            if (!doesIdExists)
            {
                context.Result = new BadRequestObjectResult($"The id {id} that you are trying to delete does not exist in the database");

            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
           
        }

       
    }
}

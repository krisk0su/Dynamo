namespace Api.Contracts
{
    using Api.Models;
    using System.Collections.Generic;

    public interface IDataService
    {
        public List<EntityModel> AllEntities();
        public List<EntityModel> UpdateEntity(EntityModel record);
        public List<EntityModel> MassUpdate(List<EntityModel> records);
        public List<EntityModel> DeleteEntity(int id);
        public List<EntityModel> MassDelete(List<int> ids);
        public List<EntityModel> Create(EntityModel record);
    }
}

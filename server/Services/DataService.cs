namespace Api.Services
{
    using Api.Contracts;
    using Api.Models;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;

    public class DataService:IDataService
    {
        private List<EntityModel> entities;
        private string _dbName = "database.json";
        public DataService()
        {
            getDataFromFile();
        }

        private void getDataFromFile()
        {

            List<EntityModel> models = new List<EntityModel>();
            using (StreamReader r = new StreamReader(this._dbName))
            {
                string json = r.ReadToEnd();
                List<EntityModel> items = JsonConvert.DeserializeObject<List<EntityModel>>(json);
                this.entities = items;
            }     
        }

        private void saveToFile()
        {
           
            using (StreamWriter file = File.CreateText(this._dbName))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, this.entities);
            }
        }
        private int GetIndex(EntityModel record)
        {
            return this.entities.FindIndex(el => el.id == record.id);
        }
        private void UpdateIndex(EntityModel record)
        {
            int index = this.GetIndex(record);
            this.entities[index] = record;
   
        }
        private void DeleteOne(int id)
        {
            this.entities = this.entities.Where(val => val.id != id).ToList();
        }
        public List<EntityModel> DeleteEntity(int id)
        {

            this.DeleteOne(id);
            //save to db
            this.saveToFile();

            return this.entities;
        }
        public List<EntityModel> MassDelete(List<int> ids)
        {
            foreach (var id in ids)
            {
                this.DeleteOne(id);
            }
            this.saveToFile();
            //save to db
            return this.entities;
        }
        public List<EntityModel> UpdateEntity(EntityModel record)
        {
            UpdateIndex(record);
            //save to db
            this.saveToFile();
            return this.entities;
        }
        public List<EntityModel> MassUpdate(List<EntityModel> records)
        {
            foreach (EntityModel record in records)
            {
                this.UpdateIndex(record);
            };
            //save to db
            saveToFile();
            return this.entities;
        }
        public List<EntityModel> AllEntities()
        {
            return this.entities;
        }

        public List<EntityModel> Create(EntityModel record)
        {
            //find biggest id
            var indexes = this.entities.Select(ent => ent.id);
            int index;
            if (indexes.Count() == 0) {
                index = 0;
            }
            else
            {
                index = indexes.Max();
            }
                
            EntityModel newRecord = new EntityModel()
            {
                id = index + 1,
                name = record.name
            };

            this.entities.Add(newRecord);
            this.saveToFile();
            return this.entities;

        }
    }
}

using System.Collections.Generic;

namespace TestSite02.AbstractModel
{
    public interface IObjectives
    {
        IEnumerable<Objective> GetObjectives(string userId);
        int SaveObjective(Objective obj, string userId);
        void RemoveObjective(int id, string userId);
        void UpdateObjective(Objective obj, string userId);
    }
}

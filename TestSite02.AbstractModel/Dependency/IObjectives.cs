using System.Collections.Generic;

namespace TestSite02.AbstractModel
{
    public interface IObjectives
    {
        IEnumerable<Objective> GetObjectives();
        void SaveObjective(Objective obj);
        void RemoveObjective(int id);
        void UpdateObjective(Objective obj);
    }
}

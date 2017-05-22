using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSite02.AbstractModel
{
    public class Objective
    {
        public string UserId { get; set; } 
        public int Id { get; set; }
        public string Name { get; set; }
        public ObjectiveStatus Status { get; set; }
    }
}

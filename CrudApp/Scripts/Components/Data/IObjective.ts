interface IObjective {
    id?: number,
    userId?: string,
    name: string,
    status?: ObjectiveStatus
}

enum ObjectiveStatus {
    New = 0,
    WorkInProgress = 1,
    Waiting = 2,
    Cancel = 3,
    Completed = 4
}
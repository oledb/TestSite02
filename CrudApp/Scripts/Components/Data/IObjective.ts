interface IObjective {
    id: number,
    userId?: string,
    name: string,
    status?: ObjectiveStatus
}

enum ObjectiveStatus {
    New,
    WorkInProgress,
    Waiting,
    Cancel,
    Completed
}
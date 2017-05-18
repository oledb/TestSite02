interface IObjective {
    id: number,
    userId: string,
    name: string,
    status: ObjectiveStatus
}

enum ObjectiveStatus {
    WorkInProgress,
    Waiting,
    Cancel,
    Completed
}
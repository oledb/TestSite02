interface IXhrModel {
    error: (xhr, status, error) => void;
    Get(success: (result: any) => void);
    Post(value: any, success: (result) => void);
    Put(value: any, success: (result) => void);
    Delete(id: number, success: (result) => void);
}
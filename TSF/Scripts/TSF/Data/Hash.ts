namespace TSF.Data
{
    /** typed hashtable to be applied to a normal object */
    export interface Hash<T>
    {
        [key: string]: T;
        [key: number]: T;
    }
}
import Sorting from "./Sorting";
export default interface Query {
    q?: Array<string>;
    fq?: Array<string>;
    fl?: Array<string>;
    sort?: Array<Sorting>;
    rows?: number;
    start?: number;
}

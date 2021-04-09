
export default class Calc {
    sum(...args){
        return args.reduce((acc, current) => {
            return acc + current;
        });
    }
}

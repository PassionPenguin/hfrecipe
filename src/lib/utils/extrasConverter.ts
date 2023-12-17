export function parseUnit(unit: string) {
    let reflect = [
        { name: "g", id: "0000" },
        { name: "mL", id: "0001" },
        { name: "x", id: "0010" }
    ];
    return reflect.find((e) => e.id === unit)?.name;
}

export class Unit {
    name: string;
    id: string;

    constructor(data: { name: string; id: string });
    constructor(data: { name: string });
    constructor(data: { id: string });
    constructor(
        data:
            | {
                  name: string;
                  id: string;
              }
            | {
                  name: string;
              }
            | {
                  id: string;
              }
    ) {
        if ("name" in data && "id" in data) {
            this.name = data.name;
            this.id = data.id;
        } else if ("name" in data) {
            this.name = data.name;
            this.id = Unit.reflect.find((e) => e.name === data.name)?.id;
        } else if ("id" in data) {
            this.name = Unit.reflect.find((e) => e.id === data.id)?.name;
            this.id = data.id;
        }
    }

    toString() {
        return this.name;
    }

    static reflect = [
        new Unit({ name: "g", id: "0000" }),
        new Unit({ name: "mL", id: "0001" }),
        new Unit({ name: "x", id: "0010" })
    ];
}

export class CountableExtras {
    id: string;
    name: string;
    amount: number;
    unit: Unit;

    constructor(data: string);
    constructor(data: {
        string: string;
        all: {
            publicId: string;
            title: string;
        }[];
    });
    constructor(data: { name: string; amount: number; unit: string });
    constructor(ingredientQuery: {
        ingredientId: string;
        amount: number;
        unit: string;
    });
    constructor(toolQuery: { toolId: string; amount: number; unit: string });

    constructor(
        data:
            | string
            | {
                  string: string;
                  all: {
                      publicId: string;
                      title: string;
                  }[];
              }
            | {
                  name: string;
                  amount: number;
                  unit: string;
              }
            | {
                  ingredientId: string;
                  amount: number;
                  unit: string;
              }
            | {
                  toolId: string;
                  amount: number;
                  unit: string;
              }
    ) {
        if (typeof data === "string" || "string" in data) {
            const split = (typeof data === "string" ? data : data.string).split(
                "-"
            );
            if (split.length === 3) {
                this.name = split[0];
                this.amount = parseInt(split[1]);
                this.unit = new Unit({ id: split[2] });
            } else {
                this.name = split[0];
                this.amount = parseInt(split[1]);
                this.unit = new Unit({
                    name: split[1].substring(this.amount.toString().length)
                });
            }
            if (typeof data !== "string") {
                this.id = data.all.find((e) => e.title === this.name)?.publicId;
            }
        } else if ("name" in data) {
            this.name = data.name;
            this.amount = data.amount;
            this.unit = new Unit({ name: data.unit });
        } else if ("ingredientId" in data) {
            this.id = data.ingredientId;
            this.amount = data.amount;
            this.unit = new Unit({ name: data.unit });
        } else if ("toolId" in data) {
            this.id = data.toolId;
            this.amount = data.amount;
            this.unit = new Unit({ name: data.unit });
        }
    }

    toString() {
        return this.name + "-" + this.amount + this.unit.name;
    }

    toInsertDDL(recipeId: string, tableName: string, extrasName: string) {
        const unitId = this.unit.id;
        return `INSERT INTO public."${tableName}" ("${extrasName}Id", "recipeId", amount, unit) VALUES ('${this.id}', '${recipeId}', ${this.amount}, B'${unitId}');\n`;
    }

    toUpdateDDL(recipeId: string, tableName: string, extrasName: string) {
        const unitId = this.unit.id;
        return `UPDATE public."${tableName}" SET amount = ${this.amount}, unit = B'${unitId}' WHERE "${extrasName}Id = '${this.id}' AND "recipeId" = '${recipeId}';\n`;
    }

    toDeleteDDL(recipeId: string, tableName: string, extrasName: string) {
        return `DELETE FROM public."${tableName}" WHERE "${extrasName}Id" = '${this.id}' AND "recipeId" = '${recipeId}';\n`;
    }
}

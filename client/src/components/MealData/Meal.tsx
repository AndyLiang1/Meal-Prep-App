import * as React from 'react';

export interface IMealProps {
    foods: [];
}

export function Meal({ foods }: IMealProps) {
    return (
        <div>
            {foods.map((food:any) => {
                return <div>{food.name}</div>;
            })}
            <button>Add food </button>
        </div>
    );
}

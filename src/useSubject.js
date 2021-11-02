// Logica para calcular las tareas y totales

import { useContext } from "react";
import { DashCunContext } from "./context/context";

import { catedraCategories, plantaCategories, resetCategories} from "./constants/categories";

const useSubjects = (title) => {
    resetCategories();
    const { subjects } = useContext(DashCunContext);
    const subjectsPerType = subjects.filter((t) => t.type === title);
    const total = subjectsPerType.reduce((acc, currVal) => acc += currVal.amount, 0);
    const categories = title === 'Catedra' ? catedraCategories : plantaCategories;

    console.log({subjectsPerType, total, categories });

    subjectsPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)

        if(category) category.amount += t.amount;

    });

    const filteredSubjects = categories.filter((c) => c.amount > 0);

    const chartData = { 
        datasets: [{
            data: filteredSubjects.map((c) => c.amount),
            backgroundColor: filteredSubjects.map((c) => c.color)
        }],
        labels: filteredSubjects.map((c) => c.type)
    }

    return { total, chartData}
        
}

export default useSubjects;

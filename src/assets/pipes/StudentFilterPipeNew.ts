import { Pipe, PipeTransform } from "@angular/core";

import { student } from "app/studentInterface";

@Pipe({
    name: 'studentFilterNew'
})
export class StudentFilterPipeNew implements PipeTransform {
    transform(students: student[], searchTerm: string): student[] {
        if (!students || !searchTerm) {
            return students;
        }

        return students.filter(student => 
            student.lastName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

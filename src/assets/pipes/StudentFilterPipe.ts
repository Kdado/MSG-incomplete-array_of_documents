import { Pipe, PipeTransform } from "@angular/core";

import { studentOld } from "app/oldStudentInterface";

@Pipe({
    name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {
    transform(students: studentOld[], searchTerm: string): studentOld[] {
        if (!students || !searchTerm) {
            return students;
        }

        return students.filter(student => 
            student.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

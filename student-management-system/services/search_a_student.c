#include "services.h"
#include <stdio.h>

void search_a_student(int rollNumber)
{
    FILE *file = fopen("data/student.dat", "r");

    struct Student student;

    if (file == NULL)
    {
        printf("Error in opening a file");
        return;
    }

    printf("\n----Student List----\n");
    int studentFound = 0;
    while (fread(&student, sizeof(struct Student), 1, file))
    {
        if (student.rollNumber == rollNumber)
        {
            printf("Name: %s\n", student.name);
            printf("Roll Number: %d\n", student.rollNumber);
            printf("Marks: %.2f\n", student.marks);
            printf("----------------------\n");
            studentFound = 1;
            break;
        }
    }

    if(studentFound == 0){
        printf("No Student with Roll Number %d Found", rollNumber);
    }

    fclose(file);
}
#include "services.h"
#include <stdio.h>

void view_all_student()
{
    FILE *file = fopen("data/student.dat", "r");

    struct Student student;

    if (file == NULL)
    {
        printf("Error in opening a file");
        return;
    }

    printf("\n----Student List----\n");
    while (fread(&student, sizeof(struct Student), 1,file))
    {
        printf("Name: %s\n", student.name);
        printf("Roll Number: %d\n", student.rollNumber);
        printf("Marks: %.2f\n", student.marks);
        printf("----------------------\n");
    }

    fclose(file);
}
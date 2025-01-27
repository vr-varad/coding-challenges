#include "services.h"
#include <stdio.h>

void add_student()
{
    struct Student student;

    FILE *file = fopen("data/student.dat", "ab");

    if (file == NULL)
    {
        printf("Error in opening a file");
        return;
    }

    printf("Enter the name of the Student: ");
    scanf(" %[^\n]", student.name); // reads entire line
    printf("Enter Roll Number: ");
    scanf("%d", &student.rollNumber);
    printf("Enter Marks: ");
    scanf("%f", &student.marks);

    fwrite(&student, sizeof(struct Student), 1, file);
    fclose(file);
    printf("Student info success fully added.");
}
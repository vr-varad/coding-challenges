#include "services.h"
#include<stdio.h>

void update_a_student(int rollNumber){
    FILE *file = fopen("data/student.dat", "rb+");

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
            printf("\n--- Current Details ---\n");
            printf("Name: %s\n", student.name);
            printf("Roll Number: %d\n", student.rollNumber);
            printf("Marks: %.2f\n", student.marks);

            printf("\nEnter new details:\n");
            printf("Enter name: ");
            scanf(" %[^\n]", student.name);
            printf("Enter marks: ");
            scanf("%f", &student.marks);


            fseek(file, -sizeof(struct Student), SEEK_CUR);
            fwrite(&student, sizeof(struct Student), 1, file);
            studentFound = 1;
            break;
        }
    }

    if(studentFound == 0){
        printf("No Student with Roll Number %d Found", rollNumber);
    }

    fclose(file);
}
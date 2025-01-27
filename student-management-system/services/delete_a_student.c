#include "services.h"
#include <stdio.h>

void delete_a_student(int rollNumber)
{
    struct Student student;

    FILE *file = fopen("data/student.dat", "rb");
    FILE *tempFile = fopen("data/temp.dat","wb");

    if (file == NULL) {
        printf("No records found!\n");
        return;
    }
    
    while (fread(&student, sizeof(struct Student), 1, file))
    {
        if (student.rollNumber == rollNumber)
        {
            printf("Record Successfully Deleted");
            
        }else{
            fwrite(&student, sizeof(struct Student), 1, tempFile);
        }
    }

    fclose(file);
    fclose(tempFile);

      remove("data/student.dat");
    rename("data/temp.dat", "data/student.dat");
}
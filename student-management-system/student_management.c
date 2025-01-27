#include <stdlib.h>
#include <stdio.h>
#include "services/services.h"

int main()
{
    int choice;

    while (1)
    {
        printf("\n----------Welcome to Student Management Student----------\n");
        printf("1. Add A Student\n");
        printf("2. View All Students\n");
        printf("3. Search A Student\n");
        printf("4. Update A Student\n");
        printf("5. Delete A Student\n");
        printf("6. Exit\n");
        printf("Enter Your Choice: ");
        scanf("%d", &choice);
        int rollNumber;
        switch (choice)
        {
        case 1:
            add_student();
            break;
        case 2:
            view_all_student();
            break;
        case 3:
            printf("Enter the roll number of student you have to search: ");
            scanf("%d", &rollNumber);
            search_a_student(rollNumber);
            break;
        case 4:
            printf("Enter the roll number of student you have to update: ");
            scanf("%d", &rollNumber);
            update_a_student(rollNumber);
            break;
        case 5:
            printf("Enter the roll number of student you have to update: ");
            scanf("%d", &rollNumber);
            delete_a_student(rollNumber);
            break;
        case 6:
            printf("\n------Thank You Please Visit Us Again------\n");
            exit(0);
            break;
        default:
            printf("Invalid choice please try again");
            break;
        }
    }
}
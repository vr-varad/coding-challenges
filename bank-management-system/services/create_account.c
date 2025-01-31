#include "services.h"
#include "../utils/utils.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void createAccount()
{
    struct Account account;

    char first_name[100];
    char last_name[100];
    printf("Please Enter Your First Name: ");
    scanf("%s", account.first_name);
    printf("Please Enter Your Last Name: ");
    scanf("%s", account.last_name);

    strcpy(account.acc_number, generateAccountNumber());

    char password[7];
    char check_password[7];

    do
    {
        printf("Please Enter Password For Your Bank Account (6 Digit): ");
        scanf("%6s", password);
        printf("Please Enter Password Again (6 Digit): ");
        scanf("%6s", check_password);
        if (strcmp(password, check_password) != 0)
        {
            printf("Passwords do not match. Try again.\n");
        }
    } while (strcmp(password, check_password) != 0);

    FILE *file = fopen("data/storage.bin", "ab");

    if (file == NULL)
    {
        printf("\n\nError in opening a file\n\n");
        return;
    }

    fwrite(&account, sizeof(struct Account), 1, file);
    fclose(file);
    printf("\n----------------------------------------------\n");
    printf("\n\nWelcome!!!\n");
    printf("\nName: %s %s \n", account.first_name, account.last_name);
    printf("\nAccount Number: %s \n", account.acc_number);
    printf("\nThank You for Trusting Us...\n");
    printf("\n----------------------------------------------\n\n\n\n");
}

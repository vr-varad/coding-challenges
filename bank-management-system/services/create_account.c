#include "services.h"
#include "../utils/utils.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* generateAccountNumber()
{
    static char acc[13]; // 12 chars + '\0'
    snprintf(acc, 13, "%012d", rand() % 1000000000000);
    return acc;
}

void createAccount()
{
    struct Account account;

    char first_name[100];
    char last_name[100];
    printf("Please Enter Your First Name: ");
    scanf("%99s", &account.first_name);
    printf("Please Enter Your Last Name: ");
    scanf("%99s", &account.last_name);

    strcpy(account.acc_number, generateAccountNumber());

    char password[7];
    char check_password[7];

    do
    {
        printf("Please Enter Password For Your Bank Account (6 Digit): ");
        scanf("%6s", &password);
        printf("Please Enter Password Again (6 Digit): ");
        scanf("%6s", &check_password);
        if (strcmp(password, check_password) != 0)
        {
            printf("Passwords do not match. Try again.\n");
        }
    } while (strcmp(password, check_password) != 0);

    strcpy(account.password, password);

    account.balance = 0.0;

    FILE *file = fopen("data/storage.dat", "ab");

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
    printf("\nCurrent Balance: %f\n", account.balance);
    printf("\nThank You for Trusting Us...\n");
    printf("\n----------------------------------------------\n\n\n\n");
}

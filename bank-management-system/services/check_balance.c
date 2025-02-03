#include "services.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void checkBalance()
{
    char acc_number[13];
    // printf("\nPlease Enter Your Account Number: ");
    // scanf("%12s", acc_number);

    FILE *file = fopen("data/storage.dat", "r");

    if (file == NULL)
    {
        printf("Error Opening the file");
        return;
    }

    struct Account account;
    while (fread(&account, sizeof(struct Account), 1, file))
    {
        printf("\nName: %s %s \n", account.first_name, account.last_name);
        printf("\nAccount Number: %s \n", account.acc_number);
        printf("Balance: %f\n", account.balance);
        // printf("%d", acc_number == account.acc_number);
        // if (strcmp(account.acc_number, acc_number) == 0)
        // {
        //     printf("Balance for account %s is Rs. %f", acc_number, account.balance);
        //     fclose(file);
        //     return;
        // }
    }

    printf("No Account Details Related to Account Number %s Found.", acc_number);

    fclose(file);
}
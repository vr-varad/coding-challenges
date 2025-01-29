#include "services.h"
#include <stdio.h>

int menu()
{
    int choice;
    printf("[1] Create Account\n");
    printf("[2] Deposit Money\n");
    printf("[3] Withdraw Money\n");
    printf("[4] Check Balance\n");
    printf("[5] View Transaction History\n");
    printf("[6] Exit\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);
    return choice;
}
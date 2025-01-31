#include <stdlib.h>
#include <stdio.h>
#include "services/services.h"
#include "utils/utils.h"

int main()
{
    printf("\n------------ Welcome to Banking System ------------\n");
    printf("\n");
    printf("Print Any key To Start\n");
    getch();
    while (1)
    {
        int choice = menu();
        switch (choice)
        {
        case 1:
            createAccount();
            break;
        case 2:
            printf("Deposite The Money\n");
            break;
        case 3:
            printf("Withdraw The Money\n");
            break;
        case 4:
            printf("Check The Balance\n");
            break;
        case 5:
            printf("View Transaction History\n");
            break;
        case 6:
            printf("Exiting\n");
            exit(0);
        default:
            printf("Please Enter A Valid Option\n");
            break;
        }
    }

    return 0;
}
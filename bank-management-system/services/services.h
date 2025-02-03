#ifndef SERVICES_H
#define SERVICES_H

int menu();
void createAccount();
void checkBalance();

struct Account
{
    char first_name[100];
    char last_name[100];
    char acc_number[13];
    char password[7];
    double balance;
};


#endif
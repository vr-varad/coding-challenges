#include "utils.h"
#include <stdlib.h>

#define LENGTH 12

int getch(void)
{
    struct termios oldattr, newattr;
    int ch;
    tcgetattr(STDIN_FILENO, &oldattr);
    newattr = oldattr;
    newattr.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newattr);
    ch = getchar();
    tcsetattr(STDIN_FILENO, TCSANOW, &oldattr);
    return ch;
}
int getche(void)
{
    struct termios oldattr, newattr;
    int ch;
    tcgetattr(STDIN_FILENO, &oldattr);
    newattr = oldattr;
    newattr.c_lflag &= ~(ICANON);
    tcsetattr(STDIN_FILENO, TCSANOW, &newattr);
    ch = getchar();
    tcsetattr(STDIN_FILENO, TCSANOW, &oldattr);
    return ch;
}

char *generateAccountNumber()
{
    const char charset[] = "QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq1234567890";
    size_t charset_size = sizeof(charset) - 1;
    char *acc_number = malloc(LENGTH + 1);

    for (int i = 0; i < LENGTH; i++)
    {
        acc_number[i] = charset[rand() % charset_size];
    }
    acc_number[LENGTH] = '\0';

    return acc_number;
}
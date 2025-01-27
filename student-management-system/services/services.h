#ifndef ADD_STUDENT_H
#define ADD_STUDENT_H

void add_student();
void view_all_student();
void search_a_student(int rollNumber);
void update_a_student(int rollNumber);
void delete_a_student(int rollNumber);


struct Student
{
    char name[50];
    int rollNumber;
    float marks;
};


#endif
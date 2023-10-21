// Find possible permutation
// Dnc Backtracking

// str = 'ab'  --> ab, ba [total 2 permutation]  [2! - 2 ka factorial]
//  str = 'abc'  --> abc, acb, bac, bca, cab, cba [total 6 permutation] [3! ka fatorial]

#include <iostream>
using namespace std;

void printPermutation(string str, int index)
{
    // base case
    if (index >= str.length())
    {
        cout << str << " ";
        return;
    }

    for (int j = index; j < str.length(); j++)
    {
        swap(str[index], str[j]);
        // recusrion sambhal lega
        printPermutation(str, index + 1);
    }
}

int main()
{
    string str = "abc"; // use double colon
    int index = 0;

    printPermutation(str, index);

    return 0;
}

// output : abc acb bac bca cab cba
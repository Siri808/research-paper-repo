#include <stdio.h>

// Merge Function: merges two sorted halves into a single sorted segment
void merge(int a[100], int low, int mid, int high) {
    int b[100];              // Temporary array to store merged result
    int i = low;             // Start index of the left half
    int j = mid + 1;         // Start index of the right half  
    int k = low;             // Start index for the temporary array

    // Compare and merge elements from both halves
    while(i <= mid && j <= high) {
        if(a[i] < a[j])      // If left element is smaller
            b[k++] = a[i++]; // Copy a[i] to b[k], then increment i and k
        else                 // If right element is smaller
            b[k++] = a[j++]; // Copy a[j] to b[k], then increment j and k
    }

    // Copy any remaining elements from the left half (if any)
    while(i <= mid)
        b[k++] = a[i++];

    // Copy any remaining elements from the right half (if any)
    while(j <= high)
        b[k++] = a[j++];

    // Copy merged elements back into original array
    for(i = low; i <= high; i++)
        a[i] = b[i];
}

// Merge Sort Function: recursively divides and sorts the array
void mergesort(int a[100], int low, int high) {
    if(low < high) {                      // Continue only if the segment has more than one element
        int mid = (low + high) / 2;       // Find the middle index

        mergesort(a, low, mid);           // Recursively sort the left half
        mergesort(a, mid + 1, high);      // Recursively sort the right half

        merge(a, low, mid, high);         // Merge the two sorted halves
    }
}

// Main Function: reads input, calls sorting function, and displays output
int main() {
    int a[100], n, i;

    printf("Enter number of elements: ");
    scanf("%d", &n);                      // Read total number of elements

    printf("Enter %d elements:\n", n);
    for(i = 0; i < n; i++)                // Read all array elements
        scanf("%d", &a[i]);

    mergesort(a, 0, n - 1);               // Call merge sort on the entire array

    printf("Sorted elements:\n");
    for(i = 0; i < n; i++)                // Print sorted array
        printf("%d\t", a[i]);

    return 0;                             // Exit program
}

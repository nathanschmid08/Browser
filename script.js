const container = document.getElementById('container');
const compareContainer = document.getElementById('compareContainer');
const resultsTable = document.getElementById('results');
const arraySize = 100;
let array = [];

let currentArraySize = 100; // Standardgröße

function generateArray(size = currentArraySize) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
}

function render(arr, element) {
    element.innerHTML = '';
    arr.forEach(height => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${height}px`;
        element.appendChild(bar);
    });
}

function shuffleArray() {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    render(array, container);
}

function clearEmptyState() {
    const emptyState = resultsTable.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
}

async function bubbleSort(arr, renderTarget) {
    renderTarget.parentElement.classList.add('sorting');
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                render(arr, renderTarget);
                await new Promise(r => setTimeout(r, 10));
            }
        }
    }
    renderTarget.parentElement.classList.remove('sorting');
}

async function insertionSort(arr, renderTarget) {
    renderTarget.parentElement.classList.add('sorting');
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            render(arr, renderTarget);
            await new Promise(r => setTimeout(r, 10));
        }
        arr[j + 1] = key;
        render(arr, renderTarget);
        await new Promise(r => setTimeout(r, 10));
    }
    renderTarget.parentElement.classList.remove('sorting');
}

async function selectionSort(arr, renderTarget) {
    renderTarget.parentElement.classList.add('sorting');
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            render(arr, renderTarget);
            await new Promise(r => setTimeout(r, 10));
        }
    }
    renderTarget.parentElement.classList.remove('sorting');
}

async function mergeSort(arr, renderTarget, start = 0) {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid), renderTarget, start);
    const right = await mergeSort(arr.slice(mid), renderTarget, start + mid);
    const merged = await merge(left, right, renderTarget, start);
    return merged;
}

async function merge(left, right, renderTarget, start) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        result.push(left[i] < right[j] ? left[i++] : right[j++]);
        render([...array.slice(0, start), ...result, ...left.slice(i), ...right.slice(j), ...array.slice(start + result.length + (left.length - i) + (right.length - j))], renderTarget);
        await new Promise(r => setTimeout(r, 10));
    }
    const merged = [...result, ...left.slice(i), ...right.slice(j)];
    for (let k = 0; k < merged.length; k++) {
        array[start + k] = merged[k];
    }
    render(array, renderTarget);
    await new Promise(r => setTimeout(r, 10));
    return merged;
}

async function quickSort(arr, renderTarget, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = await partition(arr, renderTarget, left, right);
        await quickSort(arr, renderTarget, left, pivotIndex - 1);
        await quickSort(arr, renderTarget, pivotIndex + 1, right);
    }
}

async function partition(arr, renderTarget, left, right) {
    let pivot = arr[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            render(arr, renderTarget);
            await new Promise(r => setTimeout(r, 10));
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    render(arr, renderTarget);
    await new Promise(r => setTimeout(r, 10));
    return i;
}

async function heapSort(arr, renderTarget) {
    renderTarget.parentElement.classList.add('sorting');
    function heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            render(arr, renderTarget);
            return new Promise(r => setTimeout(() => heapify(n, largest).then(r), 10));
        }
        return Promise.resolve();
    }

    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        render(arr, renderTarget);
        await new Promise(r => setTimeout(r, 10));
        await heapify(i, 0);
    }
    renderTarget.parentElement.classList.remove('sorting');
}

async function shellSort(arr, renderTarget) {
    renderTarget.parentElement.classList.add('sorting');
    let n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
                render(arr, renderTarget);
                await new Promise(r => setTimeout(r, 10));
            }
            arr[j] = temp;
            render(arr, renderTarget);
            await new Promise(r => setTimeout(r, 10));
        }
    }
    renderTarget.parentElement.classList.remove('sorting');
}

async function bogoSort(arr, renderTarget) {
    renderTarget.parentElement.classList.add('sorting');

    function isSorted(a) {
        for (let i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) return false;
        }
        return true;
    }

    while (!isSorted(arr)) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        render(arr, renderTarget);
        await new Promise(r => setTimeout(r, 50)); // langsamer, sonst zu schnell
    }

    renderTarget.parentElement.classList.remove('sorting');
}

async function radixSort(arr, renderTarget) {
    renderTarget.parentElement.classList.add('sorting');

    const max = Math.max(...arr);
    let exp = 1; // Start bei den Einerstellen

    while (Math.floor(max / exp) > 0) {
        await countingSortByDigit(arr, exp, renderTarget);
        exp *= 10;
    }

    renderTarget.parentElement.classList.remove('sorting');
}

async function countingSortByDigit(arr, exp, renderTarget) {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    // Zählen, wie oft jede Ziffer an dieser Stelle vorkommt
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
        await new Promise(r => setTimeout(r, 1));
    }

    // Count-Array in Positionen umwandeln
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Stable Sort basierend auf Ziffer
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[--count[digit]] = arr[i];
    }

    // Zurück ins Original-Array schreiben
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        render(arr, renderTarget);
        await new Promise(r => setTimeout(r, 10));
    }
}

async function countingSort(arr, renderTarget) {
    renderTarget.parentElement.classList.add('sorting');

    // Max-Wert bestimmen
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);

    // Schritt 1: Zählen, wie oft jedes Element vorkommt
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
        await new Promise(r => setTimeout(r, 2));
    }

    // Schritt 2: Array neu aufbauen aus Count-Array
    let index = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            arr[index++] = i;
            render(arr, renderTarget);
            await new Promise(r => setTimeout(r, 10));
            count[i]--;
        }
    }

    renderTarget.parentElement.classList.remove('sorting');
}

async function sortAlgorithm(name, arr, renderTarget) {
    if (name === 'bubble') return bubbleSort(arr, renderTarget);
    if (name === 'insertion') return insertionSort(arr, renderTarget);
    if (name === 'selection') return selectionSort(arr, renderTarget);
    if (name === 'merge') return mergeSort(arr, renderTarget);
    if (name === 'quick') return quickSort(arr, renderTarget);
    if (name === 'heap') return heapSort(arr, renderTarget);
    if (name === 'shell') return shellSort(arr, renderTarget);
    if (name === 'bogo') return bogoSort(arr, renderTarget);
    if (name === 'counting') return countingSort(arr, renderTarget);
    if (name === 'radix') return radixSort(arr, renderTarget);
}

async function startSort() {
    const selected = document.getElementById('algorithm').value;
    currentArraySize = (selected === 'bogo') ? 10 : 100;  // bei Bogo nur 10 Balken

    generateArray(currentArraySize);
    render(array, container);

    const arrCopy = [...array];
    const start = performance.now();
    await sortAlgorithm(selected, arrCopy, container);
    const end = performance.now();

    clearEmptyState();
    resultsTable.innerHTML += `<tr><td>${selected}</td><td>${(end - start).toFixed(2)}</td></tr>`;
}

async function compareSorts() {
    const selected1 = document.getElementById('algorithm').value;
    const selected2 = document.getElementById('algorithm2').value;

    // Entscheide die Array-Größen pro Algorithmus
    const size1 = (selected1 === 'bogo') ? 10 : 100;
    const size2 = (selected2 === 'bogo') ? 10 : 100;

    // Erstelle separate Arrays
    const arr1 = Array.from({ length: size1 }, () => Math.floor(Math.random() * 300) + 10);
    const arr2 = Array.from({ length: size2 }, () => Math.floor(Math.random() * 300) + 10);

    render(arr1, container);
    render(arr2, compareContainer);

    const start1 = performance.now();
    const promise1 = sortAlgorithm(selected1, arr1, container);

    const start2 = performance.now();
    const promise2 = sortAlgorithm(selected2, arr2, compareContainer);

    await Promise.all([promise1, promise2]);

    const end1 = performance.now();
    const end2 = performance.now();

    clearEmptyState();
    resultsTable.innerHTML += `
      <tr><td>${selected1} (links)</td><td>${(end1 - start1).toFixed(2)}</td></tr>
      <tr><td>${selected2} (rechts)</td><td>${(end2 - start2).toFixed(2)}</td></tr>
    `;
}


generateArray();
render(array, container);
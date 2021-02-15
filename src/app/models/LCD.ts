export class LCD {
    display = [['-', '-' ,'-'], ['-', '-', '-'], ['-', '-', '-']];
    number: string = '';
}

export class LCDNumbers {
    Zero = [['-','_','-'], ['|','-','|'], ['|','_','|']];
    One = [['-','-','-'], ['-','-','|'], ['-','-','|']];
    Two = [['-','_','-'], ['-','_','|'], ['|','_','-']];
    Three = [['-','_','-'], ['-','_','|'], ['-','_','|']];
    Four = [['-','-','-'], ['|','_','|'], ['-','-','|']];
    Five = [['-','_','-'], ['|','_','-'], ['-','_','|']];
    Six = [['-','_','-'], ['|','_','-'], ['|','_','|']];
    Seven = [['_','_','-'], ['-','-','|'], ['-','-','|']];
    Eight = [['-','_','-'], ['|','_','|'], ['|','_','|']];
    Nine = [['-','_','-'], ['|','_','|'], ['-','-','|']];
}
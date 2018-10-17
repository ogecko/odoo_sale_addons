// recursively check all all the Form elements for validation rules
export default function checkFormRules(acc, vm) {
    vm.$children.reduce((acc, child) => checkFormRules(acc, child), acc);
    if (vm.checkRules) {
        const msg = vm.checkRules();
        if (msg) acc.push({ label: vm.label, msg: msg });
    }
    return acc;
}
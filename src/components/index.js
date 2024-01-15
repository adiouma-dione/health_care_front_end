/* -------------------------------------------------------------------------- */
//*                       Pré-remplir le champ référence                       */
//* -------------------------------------------------------------------------- */

const reference = document.getElementById('reference')
const reference2 = document.getElementById('reference2')
reference.value = reference2.value = "Ref-" + Date.now()
reference.disabled = true
reference2.hidden = true

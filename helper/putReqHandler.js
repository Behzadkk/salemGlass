exports.putReqHandler = (req, safeParams) => {
  const editingProject = req.body;
  let updatedDetails = "UPDATE products SET ";
  safeParams.forEach(par => {
    if (editingProject[par]) {
      updatedDetails += ` ${par} = "${editingProject[par]}", `;
    }
  });
  updatedDetails += `subCat = "${req.body.subCat}" WHERE subCat = ?`;
  return updatedDetails;
};

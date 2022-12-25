const dtUniversity = async (university) => {
  return {
    alpha_two_code: university.alpha_two_code,
    name: university.name,
    web_pages: university.web_pages,
    stateProvince: university['state-province'],
    domains: university.domains,
    country: university.country,
  }
}

module.exports = {
  dtUniversity,
}

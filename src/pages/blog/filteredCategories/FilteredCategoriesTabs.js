import React, { useState } from "react";
import { motion } from "framer-motion";
import "./FilteredCategories.css"
import Toggle from "../../../components/supplements/darkmode/Toggle";
import DropDownMenu from "../../../navItems/animatedNav/dropDownMenu/DropDownMenu";

export function FilteredCategoriesTabs({
  categories,
  selectedCategory,
  onCategoryClick,
  toggleTheme,
  navOpen,
  language,
  setLanguage,
  languageExpanded,
  setLanguageExpanded,
  handleCategoryClick
}) {

  let [activeTab, setActiveTab] = useState(categories[0]);

  const handleTabClick = (category) => {
    setActiveTab(category === "All" ? null : category);
    handleCategoryClick(category);
  };

  return (
    <>
      <motion.div className="category__tabs">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`${activeTab === category? "category__button-active" : "category__button"}`}
            onClick={() => handleTabClick(category)}
          >

            {(category === "All" && activeTab === null) || (selectedCategory === category && !(category === "All" && activeTab === null)) ? (
              <motion.span key={category} style={{ borderRadius: 9999 }}  onClick={() => handleCategoryClick(category)} />) : null}
            {category}
          </motion.button>
        ))}
        <div className="category__switches">
          <Toggle toggleTheme={toggleTheme} navOpen={navOpen} />
          <DropDownMenu navOpen={navOpen} language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded} />
        </div>
      </motion.div>
    </>
  );
}


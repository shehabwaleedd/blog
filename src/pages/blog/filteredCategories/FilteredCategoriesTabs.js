import React, { useState } from "react";
import { motion } from "framer-motion";
import "./FilteredCategories.css"
import Search from "../../../components/search/Search";
import Toggle from "../../../navItems/darkmode/Toggle";
import DropDownMenu from "../../../navItems/animatedNav/dropDownMenu/DropDownMenu";

function FilteredCategoriesTabs({ categories, selectedCategory, onCategoryClick, toggleTheme, navOpen,language, setLanguage, languageExpanded, setLanguageExpanded  }) {

  let [activeTab, setActiveTab] = useState(categories[0]);

  const handleTabClick = (category) => {
    setActiveTab(category === "All" ? null : category);
    onCategoryClick(category);
  };

  return (
    <>
      <div className="category__tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category__button`}
            onClick={() => handleTabClick(category)}
          >

            {(category === "All" && activeTab === null) || (selectedCategory === category && !(category === "All" && activeTab === null)) ? (
              <motion.span key={category} layoutId="bubble" className="category__active" style={{ borderRadius: 9999 }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} onClick={() => onCategoryClick(category)} />) : null}
            {category}
          </button>
        ))}
        <div className="category__switches">
        <Toggle toggleTheme={toggleTheme} navOpen={navOpen} />
        <DropDownMenu navOpen={navOpen}  language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded}/>
        </div>
      </div>
    </>
  );
}

export default FilteredCategoriesTabs;
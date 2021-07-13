package org.jetbrains.plugins.template.services;

import com.github.phillima.asniffer.ASniffer;
import com.github.phillima.asniffer.model.AMReport;

import java.nio.file.Path;

public class ASnifferService {

    public AMReport AnalyzeProject(Path projectPath){
        //TODO Criar uma pasta dentro do intelij .asniffer com os projetos - testar.
        new ASniffer(projectPath.toString(), System.getProperty("user.dir") + ".asniffer");
        AMReport amReport = new AMReport(projectPath.getFileName().toString());
        return amReport;
    }

}

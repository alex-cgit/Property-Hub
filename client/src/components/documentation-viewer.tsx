import { useState } from "react";
import { siteDocumentation, PageDoc, SectionDoc } from "@/lib/site-docs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ChevronRight, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DocumentationViewer() {
  const [openPages, setOpenPages] = useState<Record<string, boolean>>({});

  const togglePage = (id: string) => {
    setOpenPages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExportMarkdown = () => {
    let md = "# Site Navigation & Documentation\n\n";
    md += `Generated on ${new Date().toLocaleDateString()}\n\n`;
    md += "This document outlines the full navigation structure, pages, fields, and actions available in the application.\n\n";
    md += "---\n\n";

    const processPage = (page: PageDoc, depth: number = 1) => {
      const indent = "#".repeat(depth + 1);
      md += `${indent} ${page.title}\n`;
      md += `**Route:** \`${page.route}\`\n\n`;
      md += `${page.description}\n\n`;

      if (page.sections && page.sections.length > 0) {
        md += `### Sections\n\n`;
        page.sections.forEach(section => {
          md += `#### ${section.title}\n`;
          if (section.description) md += `_${section.description}_\n\n`;
          
          if (section.fields && section.fields.length > 0) {
            md += `**Fields:**\n`;
            section.fields.forEach(field => {
              md += `- **${field.name}** (${field.type}): ${field.description}\n`;
            });
            md += "\n";
          }

          if (section.actions && section.actions.length > 0) {
            md += `**Actions:**\n`;
            section.actions.forEach(action => {
              md += `- **${action.name}** (${action.type}): ${action.description}\n`;
            });
            md += "\n";
          }
        });
      }

      if (page.subpages) {
        page.subpages.forEach(sub => processPage(sub, depth + 1));
      }
      
      md += "---\n\n";
    };

    siteDocumentation.forEach(page => processPage(page));

    // Create download
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-documentation.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderPage = (page: PageDoc, level: number = 0) => {
    const isOpen = openPages[page.id] ?? (level === 0);
    
    return (
      <div key={page.id} className="mb-4">
        <Collapsible open={isOpen} onOpenChange={() => togglePage(page.id)}>
          <div className="flex items-center gap-2 mb-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-6 w-6 hover:bg-transparent">
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2 flex-1">
              <span className={`font-bold uppercase tracking-widest ${level === 0 ? 'text-sm' : 'text-xs text-muted-foreground'}`}>
                {page.title}
              </span>
              <Badge variant="outline" className="rounded-none text-[8px] font-mono bg-muted/50 text-muted-foreground border-border/50">
                {page.route}
              </Badge>
            </div>
          </div>

          <CollapsibleContent>
            <div className={`border-l-2 border-border/30 ml-3 pl-4 space-y-4 pb-4 ${level > 0 ? 'mt-2' : ''}`}>
              <p className="text-xs text-muted-foreground italic mb-4">
                {page.description}
              </p>

              {page.sections.map((section, idx) => {
                const hasContent = (section.fields && section.fields.length > 0) || (section.actions && section.actions.length > 0);
                return (
                  <div key={idx} className="mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      {section.title}
                      {section.description && (
                        <span className="font-normal normal-case ml-1">— {section.description}</span>
                      )}
                    </h4>
                    {hasContent ? (
                      <div className="rounded-none border border-border/50 overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-border/50">
                              <TableHead className="text-[10px] font-bold uppercase tracking-widest w-[120px]">Category</TableHead>
                              <TableHead className="text-[10px] font-bold uppercase tracking-widest">Name</TableHead>
                              <TableHead className="text-[10px] font-bold uppercase tracking-widest w-[100px]">Type</TableHead>
                              <TableHead className="text-[10px] font-bold uppercase tracking-widest">Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {section.fields?.map((field, fIdx) => (
                              <TableRow key={`f-${fIdx}`} className="border-border/50">
                                <TableCell className="text-[10px] text-muted-foreground py-2">Field</TableCell>
                                <TableCell className="font-medium text-xs py-2">{field.name}</TableCell>
                                <TableCell className="py-2">
                                  <Badge variant="secondary" className="rounded-none text-[8px] h-4">{field.type}</Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground py-2">{field.description}</TableCell>
                              </TableRow>
                            ))}
                            {section.actions?.map((action, aIdx) => (
                              <TableRow key={`a-${aIdx}`} className="border-border/50">
                                <TableCell className="text-[10px] text-emerald-600/90 py-2">Action</TableCell>
                                <TableCell className="font-medium text-xs py-2">{action.name}</TableCell>
                                <TableCell className="py-2">
                                  <Badge variant="outline" className="rounded-none text-[8px] h-4 bg-background">{action.type}</Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground py-2">{action.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic py-1">No fields or actions</p>
                    )}
                  </div>
                );
              })}

              {page.subpages && (
                <div className="mt-4 pt-4 border-t border-border/30">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Sub-Pages</h4>
                  {page.subpages.map(sub => renderPage(sub, level + 1))}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-none border-border/50 shadow-sm">
        <CardHeader className="bg-muted/30 border-b border-border/50 py-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xs font-bold uppercase tracking-widest">Site Documentation</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest">Full map of pages, fields, and actions</CardDescription>
          </div>
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold shadow-sm hover:shadow-md transition-all"
            onClick={handleExportMarkdown}
          >
            <Download className="mr-2 h-3 w-3" /> Export to Markdown
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[600px] pr-4">
            {siteDocumentation.map(page => renderPage(page))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
